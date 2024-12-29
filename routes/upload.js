const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:8080/file/${req.file.filename}`;
    return res.send(imgUrl);
});

module.exports = router;

/**
 * @swagger
 * /file/upload:
 *   post:
 *     tags: ["File Upload"]
 *     summary: Upload a file.
 *     description: Upload a file to the server and receive the URL for accessing it.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload.
 *     responses:
 *       200:
 *         description: Successfully uploaded file. Returns the URL to access the file.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "http://localhost:8080/file/filename.jpg"
 *       400:
 *         description: No file selected.
 *       500:
 *         description: Server error during file upload.
 */
/**
 * @swagger
 * /file/{filename}:
 *   get:
 *     tags: ["File Upload"]
 *     summary: Download a file by filename.
 *     description: Retrieve a file from the server by its filename.
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         description: The name of the file to download.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The file is successfully downloaded.
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: The file was not found.
 *       500:
 *         description: Server error during file retrieval.
 */

/**
 * @swagger
 * /file/{filename}:
 *   delete:
 *     tags: ["File Upload"]
 *     summary: Delete a file by filename.
 *     description: Delete a file from the server by its filename.
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         description: The name of the file to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The file was successfully deleted.
 *       404:
 *         description: The file was not found.
 *       500:
 *         description: Server error during file deletion.
 */
