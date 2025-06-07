# GR Youtube Dl

> Disclaimer:
This project is intended solely for educational purposes to learn Electron.js and understand the process of building and deploying desktop applications. It functions as a graphical user interface (GUI) wrapper for the open-source command-line tool yt-dlp.

>This project does not host, distribute, or modify any video content. All downloading functionality is provided by yt-dlp, and this application does not claim ownership or responsibility for the behavior of yt-dlp.

>Users are responsible for complying with the YouTube Terms of Service and any applicable copyright laws in their jurisdiction. Downloading copyrighted content without permission may violate these laws. The developer does not condone or promote any illegal use of this tool.

This project is a desktop application for downloading YouTube videos. It allows users to input a YouTube video URL and download the video to their local machine.

## Features

*   Download YouTube videos by providing a URL.
*   Choose video quality and format using ffmpeg.

## Technologies Used

*   **Electron**: A framework to build desktop apps using JS, HTML and CSS.
*   **yt-dlp:** A command-line program to download videos from YouTube and other sites.
*   **ffmpeg:** A complete, cross-platform solution to record, convert and stream audio and video. Used for video processing tasks.

## Prerequisites

*   Node.js and npm (or yarn) installed.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the application:**
    ```bash
    npm start
    ```

<!-- ## Project Structure

*   `main.js`: Main process for the Electron application.
*   `renderer.js`: Renderer process for the Electron application (handles front-end logic).
*   `index.html`: Main HTML file for the user interface.
*   `styles.css`: Styles for the user interface.
*   `package.json`: Contains project metadata, dependencies, and scripts.
*   `yt-dlp.exe`, `ffmpeg.exe`, `ffprobe.exe`, `ffplay.exe`: Command-line tools used by the application.
*   `assets/`: Contains static assets like images or icons.
 -->

<!-- ## How it Works (High-Level)

1.  The user interface (built with HTML, CSS, and JavaScript in `index.html` and `renderer.js`) takes a YouTube video URL as input.
2.  The `renderer.js` script communicates with the `main.js` (Electron main process).
3.  The `main.js` process then uses `yt-dlp.exe` to download the video.
4.  `ffmpeg.exe` is used for converting the video to different formats or extracting audio.
5.  `ffprobe.exe` could be used to get information about the video.
6.  `ffplay.exe` might be integrated to allow playing the downloaded videos. -->

<!--
## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.-->
