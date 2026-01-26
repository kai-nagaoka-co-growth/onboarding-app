class Api::V1::CommentsController < ApplicationController

  before_action :set_memo, only: [:index, :create]
  
  def index
    comments = @memo.comments
    render json: comments.as_json, status: :ok
  end

  def create
    comment = @memo.comments.new(comment_params)
    comment.save!
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end

  def set_memo
    @memo = Memo.find(params[:memo_id])
  end
end