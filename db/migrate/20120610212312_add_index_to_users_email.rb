class AddIndexToUsersEmail < ActiveRecord::Migration
  def change
    # Add an index to the email column of the users table to ensure uniqueness
    add_index :users, :email, unique: true
  end
end
