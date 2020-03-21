# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
Stock.destroy_all
Transaction.destroy_all

ActiveRecord::Base.connection.reset_pk_sequence!('users');
ActiveRecord::Base.connection.reset_pk_sequence!('stocks');
ActiveRecord::Base.connection.reset_pk_sequence!('transactions');




u1 = User.create(username: 'demoUser', email: 'demoUser@email.com', password:'password123', money: 5000.00);
u2 = User.create(username: 'parfittChris', email: 'parfittChris@email.com', password:'password123', money: 5000.00);
