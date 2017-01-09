class Tour < ApplicationRecord
  belongs_to :user

  def as_json(options = { })
    h = super(options)
    h[:isMy] = user == options[:current_user]
    h
  end
end
