class Stock < ApplicationRecord
    validates :name, :quantity, :user_id, presence: true

    
    belongs_to :users,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

end