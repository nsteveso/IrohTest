import { Octokit } from "@octokit/rest";
import * as fs from "fs";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Octokit
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const owner = "nsteveso"; // Replace with your GitHub username
const repo = "IrohTest"; // Repository name
const filePath = "README.txt"; // File to update

async function updateFile() {
    try {
        // Get the latest commit SHA and file details
        const { data: fileData } = await octokit.repos.getContent({
            owner,
            repo,
            path: filePath,
        });

        // Update content
        const updatedContent = "This is the updated content from Iroh!";
        const encodedContent = Buffer.from(updatedContent).toString("base64");

        // Create a commit to update the file
        await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path: filePath,
            message: "Update README.txt",
            content: encodedContent,
            sha: fileData.sha,
        });

        console.log("File updated successfully!");
    } catch (error) {
        console.error("Error updating the file:", error);
    }
}

updateFile();
