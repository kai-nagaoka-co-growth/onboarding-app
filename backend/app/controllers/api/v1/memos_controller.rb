class Api::V1::MemosController < ApplicationController
  def index
    @memos = Memo.all.order(created_at: :desc).pluck(:title, :updated_at)
    render json: @memos.as_json, status: :ok
  end
end
