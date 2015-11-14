class ChannelsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @channels = ChatRoom.all
  end

  def create
  end

  def new
  end

  def destroy
  end

  def show
    @channel = ChatRoom.find params[:id]
    @channel_users = ChatRoomUser.where(chat_room_id: @channel.id)
  end
end
