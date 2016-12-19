# config valid only for current version of Capistrano
lock '3.6.1'

set :application, 'tours'
set :repo_url, 'git@github.com:/arnage/tours.git'
set :stages,        %w(staging production)
set :stage_dir,     "app/config/deploy"

set :scm, :git

namespace :deploy do
  after :publishing , :restart do
    on roles(:app) , in: :groups, limit: 4 do
      execute "touch #{release_path}/tmp/restart.txt"
    end
  end

  desc "No ActiveRecord override"
  task :migrate do
  end
end
