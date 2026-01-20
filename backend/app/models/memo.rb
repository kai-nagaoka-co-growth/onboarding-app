class Memo < ApplicationRecord
  has_many :comments, dependent: :destroy
end
