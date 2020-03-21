class Transaction < ApplicationRecord
    validates :user_id, :transactionType, :stock, :quantity, :price, presence: true

    
    belongs_to :users,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

end