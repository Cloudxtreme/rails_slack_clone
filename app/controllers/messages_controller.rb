class MessagesController < ApplicationController
  def index
    @messages = Message.where(chat_room_id: params[:chat_room_id])
    render json: @messages
  end

  def create
    message = Message.new
    message.content = params[:content]
    message.user_id = params[:user_id]
    message.chat_room_id = params[:chat_room_id]

    if message.save
      render json: message
    else
      render json: {status: "ERROR!"}
    end
  end

  def new
  end

  def destroy
  end

  def show
  end
end
