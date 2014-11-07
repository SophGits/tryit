# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.

# Make sure your secret_key_base is kept private
# if you're sharing your code publicly.
HelloApp::Application.config.secret_key_base = '2c03c50436ce06ace0aceaa993b9cbcff285e7b171d665495049893d31dfef7c245d62645fadfb6f97257fae2cf405dcd47c161bad265b84a9b13d5fa860b553'
