pipeline {
    agent any

    environment {
        IMAGE_NAME = "riqimaruq/website-klinik"
        IMAGE_TAG  = "${BUILD_NUMBER}"

        GITOPS_REPO = "git@github.com:riqimaruq/website-klinik-gitops.git"
    }

    stages {

        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }

        stage('Test Github SSH') {
            steps {

                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'github',
                        keyFileVariable: 'SSH_KEY',
                        usernameVariable: 'SSH_USER'
                    )
                ]) {

                    sh '''
                        echo "USER=$SSH_USER"

                        ls -lah "$SSH_KEY"

                        ssh \
                          -i "$SSH_KEY" \
                          -o StrictHostKeyChecking=no \
                          -T git@github.com || true
                    '''
                }
            }
        }

    }
}
