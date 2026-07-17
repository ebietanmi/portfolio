import express, { json } from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import nodemailer from 'nodemailer';
import { v2 as cloudinary } from 'cloudinary';
import {
    createUserSQL, getUserSQL,
    getUsersSQL, checkUserSQL, createProjectSQL, createBlogSQL,
    getProjectsSQL, getProjectSQL,
    deleteProjectSQL, updatePasswordSQL, createRecievedMailSQL,
    getBlogsSQL
} from './controllers/database_controller.js';


cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET

});


const PORT = 3000;
const app = express();
app.use(cors()) // 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



// Handles and report errors tha may arise while starting the server.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

//This API route handles te creation of new user.
export async function createUser() {
    const authMiddleware = async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token' })
        }
        else {
            try {
                const decoded = await jwt.verify(token, process.env.JWT_SECRET)
                req.user = { id: decoded.userId }
                next()
            } catch (error) { return res.status(401).json({ error: "Invalid token" }) }
        }
    }
    const user = await app.post('/create-user', authMiddleware, async (req, res) => {
        const { username, password, role } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const response = await createUserSQL(username, hashedPassword, role);
            if (response.ok) {
                console.log(response)
                res.status(201).send({ 'ok': true, 'message': response.SQLMessage, userId: response.insertId });
            }
            else if (response.taken) {
                res.status(401).send({ 'ok': false, 'message': response.SQLMessage });
            }
            else {
                res.status(500).send({ 'ok': false, 'message': response.SQLMessage })
            }

        }
        catch (error) {
            if (error instanceof Error)
                res.status(500).send({ 'ok': false, error: 'An error occurred while creating user' });
        }
    }
    );
}

//This API route handling creation of new user.
export async function fetchUsers() {
    const users = await app.get('/users', async (req, res) => {
        try {
            const data = await getUsersSQL();
            res.status(200).send(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).send({ error: 'An error occurred while fetching users' });
        }
    })
}

//This API route handles the finding of one user.
export async function findOneUser(id) {
    const user = await app.get('/users/:id', async (req, res) => {
        const id = req.params.id;
        try {
            const data = await getUserSQL(id);
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({ error: 'An error occurred while fetching user' });
        }
    })
}

//This API route handles the checking if user exists.
export async function logIn() {
    const data = await app.post('/login', async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await checkUserSQL(username);
            if (user === null) {
                res.status(401).send({ message: "Invalid Username or Password" })
            } else {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    const token = jwt.sign({ userId: user.id, username: username },
                        process.env.JWT_SECRET,
                        { expiresIn: '15m' }
                    );
                    res.status(201).send({ token, sucess: true, id: user.id, user: username });
                }
                else { res.status(401).json({ sucess: false }) }
            }
        } catch (error) {
            res.status(500).send(error);
        }
    })
}

//This API route handles the creation of new user.
async function createProject() {

    // This sets up multer to facilitate uploading of file.
    const storage = multer.diskStorage({
        destination: "./assets/projects",
        filename: (req, file, callback) => {
            const uniqueName = Date.now() + path.extname(file.originalname);
            callback(null, uniqueName);
        }
    });
    const upload = multer({ storage });

    await app.post('/create-project', upload.single('img_file'), async (req, res) => {
        const { project_title, project_author, project_description } = req.body;
        const imgPath = `./assets/projects/${req.file.filename}`;

        try {
            const response = await createProjectSQL(
                project_title,
                project_author,
                project_description,
                imgPath
            );
            if (response.affectedRows > 0) {
                res.status(200).send({ success: true });
            } else {
                res.status(500).send({ success: false })
            }

        } catch (error) {
            res.status(500).send({ error: error })
        }

    })

}

// This API gets a single project using the ID
export async function getProject(id) {
    const response = app.get('/projects/:id', async (req, res) => {
        const id = req.params.id;
        const data = await getProjectSQL(id)
        data.length > 0 ? res.status(201).send(data) : res.status(401).send({ "Message": 'No project Found' })
    });

}

//This API route handles fetching odf all project.
export async function getProjects() {
    const response = app.get("/projects", async (req, res) => {
        try {
            const data = await getProjectsSQL();
            data.length > 0 ? res.status(200).send(data) : res.status(401).send({ "message": data.SQLMessage })
        } catch (error) {
            console.error('Error fetching projects:', error);
            res.status(500).send({ error: 'An error occurred while fetching projects' });
        }
    })
}

export async function deleteProject() {
    try {
        await app.delete('/delete-project/:id', async (req, res) => {
            const id = req.params.id;
            const response = await deleteProjectSQL(id);
            response.ok ? res.status(201).send(response) : res.status(401).send(response)
        })
    } catch (error) {
        throw new Error(error);
    }

}
//This API route handles the creation of new blog.
async function CreateBlog() {
    //Multer set up for blog
    const storage = multer.diskStorage({
        destination: "./assets/blogs",
        filename: (req, file, callback) => {
            const uniqueName = Date.now() + path.extname(file.originalname);
            callback(null, uniqueName);
        }
    });
    const upload = multer({ storage });

    await app.post('/create-blog', upload.single('blog_file'), async (req, res) => {
        const { blog_title, blog_excerpt, blog_creation_date, blog_category } = req.body;
        const blog_img_path = `./assets/blogs/${req.file.filename}`;

        try {
            const response = await createBlogSQL(
                { blog_title, blog_excerpt, blog_creation_date, blog_category, blog_img_path }
            );
            if (response.ok) {
                res.status(200).send({ 'ok': true, 'message': response.SQLMessage });
            } else {
                res.status(500).send({ 'ok': false, 'message': response.SQLMessage })
            }

        } catch (error) {
            res.status(500).send({ error: error, 'ok': false })
        }

    })

}

export async function getBlogs() {
    const response = app.get("/blog", async (req, res) => {
        try {
            const data = await getBlogsSQL();
            data.length > 0 ? res.status(200).send(data) : res.status(401).send({ "message": data.SQLMessage })
        } catch (error) {
            console.error('Error fetching projects:', error);
            res.status(500).send({ error: 'An error occurred while fetching blogs' });
        }
    })
}


export async function resetPassword() {
    const authMiddleware = async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token' })
        }
        else {
            try {
                const decoded = await jwt.verify(token, process.env.JWT_SECRET)
                req.user = { id: decoded.userId }
                next()
            } catch (error) { return res.status(401).json({ error: "Invalid token" }) }
        }
    }
    const response = await app.put('/reset-password', authMiddleware, async (req, res) => {
        try {
            const userId = req.user.id;
            const { oldPassword, newPassword } = req.body;
            if (!oldPassword || !newPassword) return res.status(400).json({ 'message': 'All field required', "ok": false })
            const [user] = await getUserSQL(userId);
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                res.status(404).json({ "message": 'Old Password Incorrect', "ok": false })
            } else {
                const hashedPassword = await bcrypt.hash(newPassword, 10)
                await updatePasswordSQL(userId, hashedPassword).
                    then(res.status(200).json({ 'ok': true, 'message': 'Password updated successfully' }));
            }
        } catch (error) {
            res.status(500).json({ error: 'Sever Error', 'message': error })
        }
    },
    )

}


// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail", // or use host/port below
//   auth: {
//     user: process.env.EMAIL_USER, // your gmail
//     pass: process.env.EMAIL_PASS, // NOT your gmail password. See below
//   },
// });

// const sendEmail = async () => {
//   try {
//     const info = await transporter.sendMail({
//       from: '"Your Name" <you@gmail.com>',
//       to: "nachurboi@gmail.com",
//       subject: "Test Email",
//       text: "Hello from Node.js",
//       html: "<b>Hello from Node.js</b>",
//     });

//     console.log("Message sent:", info.messageId);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// sendEmail();

// Create a transporter using SMTP
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//     },
// });


// async function SendMail(name, email, message) {
  
//     try {  
//         const mailOptions = {
//         from: `${email}`,
//         to: `${process.env.SMTP_USER}`,
//         subject: `Message form ${name}`,
//         text: `${message}`
//     };
//         await transporter.verify();
//         transporter.sendMail(mailOptions, (error, info) => {
//             error ? console.log(error) : console.log(`Email sent: ${info.response}`)
//         })
//     } catch (err) {
//         console.error("Verification failed:", err);
//     }
// }

export async function createRecievedMail() {
    await app.post("/send-mail", async (req, res) => {
        try {
            const { name, email, message } = req.body;
            const response = await createRecievedMailSQL(name, email, message);
            if (response.ok) {
                res.status(200).send({ "message": 'Message saved', "ok": true });
                // await SendMail(name, email, message);
            } else {
                res.status(500).send({ "message": 'Unable to save message', "ok": false })
            }
        } catch (error) {

        }
    })
}


// Starting the server.
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
});



createUser();
fetchUsers();
findOneUser();
logIn();
createProject();
getProject()
getProjects();
deleteProject();
resetPassword();
createRecievedMail();
CreateBlog();
getBlogs();
