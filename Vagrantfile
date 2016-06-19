ENV['VAGRANT_DEFAULT_PROVIDER'] = 'docker'

DOCKER_HOST_NAME ||= "dockerhost"
DOCKER_HOST_VAGRANTFILE ||= "./DockerHostVagrantFile"
DOCKER_FILE_DIR ||= "."

Vagrant.configure(2) do |config|
  config.vm.synced_folder "./app", "/usr/local/src/app", mount_options: ["dmode=777","fmode=777"]


  config.vm.define "postgres" do |v|
    v.vm.provider "docker" do |d|
      d.image = "paintedfox/postgresql"
      d.volumes = ["/var/docker/postgresql:/data"]
      d.ports = ["5432:5432"]
      d.env = {
        USER: "root",
        PASS: "abcdEF123456",
        DB: "root"
      }
      d.name = "postgres"
      d.vagrant_machine = "#{DOCKER_HOST_NAME}"
      d.vagrant_vagrantfile = "#{DOCKER_HOST_VAGRANTFILE}"
    end
  end


  config.vm.define "redis" do |v|
    v.vm.provider "docker" do |d|
      d.image = "paintedfox/redis"
      d.volumes = ["/var/docker/redis:/data"]
      d.ports = ["6379:6379"]
      d.name = "redis"
      d.vagrant_machine = "#{DOCKER_HOST_NAME}"
      d.vagrant_vagrantfile = "#{DOCKER_HOST_VAGRANTFILE}"
    end
  end


  config.vm.define "search" do |v|
    v.vm.provider "docker" do |d|
      d.image = "_/elasticsearch"
      d.ports = ["9200:9200", "9300:9300"]
      d.name = "search"
      d.vagrant_machine = "#{DOCKER_HOST_NAME}"
      d.vagrant_vagrantfile = "#{DOCKER_HOST_VAGRANTFILE}"
    end
  end


  config.vm.define "queue" do |a|
    a.vm.provider "docker" do |d|
      d.build_dir = "#{DOCKER_FILE_DIR}"
      d.build_args = ["-t=queue"]
      d.dockerfile = "Dockerfile.beanstalkd"
      d.name = "queue"
      d.ports = ["11300:11300"]
      d.vagrant_machine = "#{DOCKER_HOST_NAME}"
      d.vagrant_vagrantfile = "#{DOCKER_HOST_VAGRANTFILE}"
    end
  end

end
