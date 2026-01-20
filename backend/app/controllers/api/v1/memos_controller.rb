class Api::V1::MemosController < ApplicationController
  def index
    @memos = Memo.all.order(created_at: :desc)
    render json: @memos.as_json, status: :ok
  end

  def create
    @memo = Memo.new(memo_params)
    if @memo.save
      render json: @memo.as_json, status: :created
    else
      render json: { errors: @memo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def memo_params
    params.require(:memo).permit(:title, :body)
  end
end
