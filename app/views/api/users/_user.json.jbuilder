json.extract! user, :id, :username, :email, :money

json.followed_stocks do 
    json.array! user.followed_stocks do |stock|
        json.extract! stock, :id, :name, :quantity
    end
end
