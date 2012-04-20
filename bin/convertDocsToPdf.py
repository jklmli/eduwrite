import os
import shutil
import subprocess
import sys

__author__ = 'jon'

# Top-level directories to document
topLevelDirectories = ['docs', 'docs-pdf'] # Source, destination

# Path to execute binary to convert from HTML to pdf 
converterPath = 'wkhtmltopdf'

def convertDocs():
    """
      Convert the docs (assumed to be under the 'docs' directory, from docco-husky) to a single PDF
    """

    # File paths to convert from HTML to PDF
    filesToConvert = []

    # List holding the folders to document
    documentationDirectories = []

    # Make the output directory if it doesn't exist
    if not os.path.exists(topLevelDirectories[1]):
        os.mkdir(topLevelDirectories[1])

    # Walk the directory tree from all top-level directories
    for directory, subdirectories, fileNames in os.walk(topLevelDirectories[0]):

        # Add any folders that contain html files
        for fileName in fileNames:
            if fileName[-5:] == '.html':
                if directory not in documentationDirectories:
                    documentationDirectories.append(directory)
                filesToConvert.append(os.path.join(directory, fileName))

    convertDocsCommand = converterPath + ' ' + (' '.join(filesToConvert)) + (' ' + os.path.join(topLevelDirectories[1], 'eduwrite.pdf'))
    subprocess.call(convertDocsCommand, shell=True)


if __name__ == '__main__':
    convertDocs()

