# Prepare deploy directory
rm -rf deploy
mkdir deploy

# Build projects
npm run build-storybook

# Copy projects and deployment files
cp captain-definition deploy/captain-definition
cp dockerfile deploy/dockerfile
cp -r storybook-static deploy/storybook

cd deploy
tar --exclude-vcs -zcvf deploy.tar.gz .
caprover deploy -t deploy.tar.gz --default