# == Schema Information
#
# Table name: chat_rooms
#
#  id          :integer          not null, primary key
#  name        :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class ChatRoom < ActiveRecord::Base
  has_many :messages
  has_many :users
end
