class Api::V1::MemosController < ApplicationController
  def index
    @memos = Memo.all.order(created_at: :desc)
    render json: @memos.as_json, status: :ok
  end
end
