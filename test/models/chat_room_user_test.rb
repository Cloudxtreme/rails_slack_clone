# == Schema Information
#
# Table name: chat_room_users
#
#  id           :integer          not null, primary key
#  chat_room_id :integer
#  user_id      :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class ChatRoomUserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
