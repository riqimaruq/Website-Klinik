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

        stage('Build Docker Image') {
            steps {
                sh """
                    docker build \
                    -t ${IMAGE_NAME}:${IMAGE_TAG} .
                """
            }
        }

        stage('Push Docker Image') {
            steps {
                sh """
                    docker push ${IMAGE_NAME}:${IMAGE_TAG}
                """
            }
        }

       stage('Update GitOps Repo') {
    steps {

        withCredentials([
            sshUserPrivateKey(
                credentialsId: 'github',
                keyFileVariable: 'SSH_KEY'
            )
        ]) {

            sh '''
                rm -rf gitops

                export GIT_SSH_COMMAND="ssh -i $SSH_KEY -o StrictHostKeyChecking=no"

                git clone git@github.com:riqimaruq/website-klinik-gitops.git gitops

                cd gitops

                sed -i "s/tag:.*/tag: \\"'"${IMAGE_TAG}"'\\"/" values.yaml

                git config user.email "jenkins@local"
                git config user.name "Jenkins"

                git add values.yaml

                git commit -m "Update image tag to ${IMAGE_TAG}" || true

                git push origin main
            '''
        }
    }
}
    }
}
