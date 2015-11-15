class MessagesController < ApplicationController
  before_action :authenticate_user!

  def index
    @messages = Message.where('id > ?', params[:after_id].to_i).order('created_at DESC')
  end

  def create
    respond_to do |format|
      @message = current_user.messages.build(message_params)
      if @message.save
        flash.now[:success] = 'Your message was successfully posted!'
      else
        flash.now[:error] = 'Your message cannot be saved.'
      end
      format.html {redirect_to new_message_path}
      format.js
    end
  end

  def new
    @message = Message.new
    @messages = Message.order('created_at DESC')
  end

  def destroy
  end

  def show
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end
