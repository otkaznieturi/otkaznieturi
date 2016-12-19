server '85.143.214.26', user: 'arnage', roles: %w{web app db}
set :ssh_options, { :forward_agent => true }

set :stage, 'production'
set :keep_releases, 5
set :rvm_type, :system
set :rvm_ruby_version, '2.2.2'

set :deploy_to, "/home/arnage/buyengine/"
#
set :ssh_options, {
  	user: "arnage"
}
