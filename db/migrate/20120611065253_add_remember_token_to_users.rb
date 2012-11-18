class AddRememberTokenToUsers < ActiveRecord::Migration
  # Adds a unique token associated with this users login cookie
  def change
    add_column :users, :remember_token, :string
    add_index :users, :remember_token
  end
end
