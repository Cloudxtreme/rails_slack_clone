# == Schema Information
#
# Table name: messages
#
#  id           :integer          not null, primary key
#  content      :text
#  chat_room_id :integer
#  user_id      :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Message < ActiveRecord::Base
  belongs_to :chat_room
  belongs_to :user

  def as_json(options={})
    {
      id: self.id,
      content: self.content,
      user_email: self.user.email
    }
  end
end
