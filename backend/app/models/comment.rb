class Comment < ApplicationRecord
  belongs_to :memo

  validates :body, presence: true
end
