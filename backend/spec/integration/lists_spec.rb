require 'swagger_helper'

RSpec.describe 'Lists API', type: :request do
  path '/lists' do
    get 'Retrieve all lists' do
      tags 'Lists'
      produces 'application/json'

      response '200', 'Lists retrieved' do
        run_test!
      end
    end

    post 'Create a list' do
      tags 'Lists'
      consumes 'application/json'
      parameter name: :list, in: :body, schema: {
        type: :object,
        properties: {
          title: { type: :string }
        },
        required: ['title']
      }

      response '201', 'List created' do
        let(:list) { { title: 'New List' } }
        run_test!
      end
    end
  end
end
