class CreateChatRooms < ActiveRecord::Migration
  def change
    create_table :chat_rooms do |t|
      t.string :name
      t.text :description

      t.timestamps null: false
    end
  end
end
