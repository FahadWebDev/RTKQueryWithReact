pipeline {
    agent any
    
      stages {
          stage('build') {
              steps {
                  echo 'building the software'
                  sh 'npm i' 
                  sh  'npm run build' 
              } 
          }

          
          stage('deploy') {
              steps {
                  echo 'Deploying the softwares'
          }
      } 
    }
     post {
             success {
                echo 'success'

             }
             failure{
             echo 'failure'
            }
      }
}
