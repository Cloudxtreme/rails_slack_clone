class CreateChatRoomUsers < ActiveRecord::Migration
  def change
    create_table :chat_room_users do |t|
      t.references :chat_room, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
