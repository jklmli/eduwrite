import os
import shutil
import subprocess
import sys

__author__ = 'jon'

# Top-level directories to document
topLevelDirectories = ['node', 'test']

# Path to execute docco
doccoPath = 'node_modules/docco/bin/docco'

def generateDocs(directory):
    """
      Generate the documentation
    """

    # Create the docs directory tree
    documentationDirectory = 'docs/' + directory
    if os.path.exists(documentationDirectory):
        shutil.rmtree(documentationDirectory)
    os.makedirs(documentationDirectory)

    # Call Docco on each source file
    for fileName in os.listdir(directory):
        if os.path.isfile(directory + '/' + fileName):
            subprocess.call([doccoPath, directory + '/' + fileName])

    # Move the generate documentation into the docs folder
    for fileName in os.listdir('docs'):
        if os.path.isfile('docs/' + fileName):
            shutil.move('docs/' + fileName, documentationDirectory)


if __name__ == '__main__':

    if not os.path.exists(doccoPath):
        print "Error, must install Docco to 'node_modules' before generating documentation"
    else:

        for topLevelDirectory in topLevelDirectories:

            # List holding the folders to document
            directoriesToDocument = []

            # Walk the directory tree from all top-level directories
            for directory, subdirectories, fileNames in os.walk(topLevelDirectory):

                # Add any folders that contain js files
                for fileName in fileNames:
                    if fileName[-3:] == '.js':
                        directoriesToDocument.append(directory)
                        break

            # Generate the documentation for each directory using docco
            for directory in directoriesToDocument:
                generateDocs(directory)
