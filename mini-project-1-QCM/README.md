## Hosting on GitHub Pages

To host the `mini-project-1-QCM` folder as a website on GitHub Pages, follow these steps:

1. **Clone the Repository**:
   Clone the repository to your local machine.

   ```bash
   git clone https://github.com/mokhatiri/TpJs_Mohammed_khatiri
   cd TpJs_Mohammed_khatiri
   ```
2. **Create a `gh-pages` Branch**:
    Create a new branch called `gh-pages` from the main branch.

    ```bash
    git checkout -b gh-pages
    ```

3. **Move to the `mini-project-1-QCM` Directory**:
    Change to the `mini-project-1-QCM` Directory.

    ```bash
    cd mini-project-1-QCM
    ```

4. **Remove Everything Except the `mini-project-1-QCM` Directory**:
    Remove all files and directories except the contents of the `mini-project-1-QCM` directory.

    ```bash
    rm -rf ../*
    mv * ../
    cd ..
    rm -rf mini-project-1-QCM
    ```

5. **Push the `gt-pages` Branch**:
    Push the `gh-pages` brach to Github.

    ```bash
    git add .
    git commit -m "Deploy mini-project-1-QCM to GitHub Pages"
    git push -u origin gh-pages
    ```

6. **Configure Github Pages**:
    Go to the repository on GitHub, click on the "Settings" tab, and scroll down to the "Pages" section. Under "Source", select the `gh-pages` branch and click "Save".

7. **Access the Website**:
    After a few minutes, the website will be available at :
    `https://<your-username>.github.io/<repository-name>`.
