FROM centos:centos6
# Enable EPEL for Node.js
RUN rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN yum install -y npm
RUN yum install -y git
# Get source code
RUN git clone https://github.com/craigbilner/quizapp.git
RUN cd quizapp; git pull
# Install app dependencies
RUN cd quizapp; npm install
RUN cd quizapp; npm run build
EXPOSE 3000
CMD ["npm", "start"]
