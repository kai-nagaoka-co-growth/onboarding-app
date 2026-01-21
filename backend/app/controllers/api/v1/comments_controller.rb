class Api::V1::CommentsController < ApplicationController

  def create
    memo = Memo.find(params[:memo_id])
    comment = memo.comments.new(comment_params)
    comment.save!
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end