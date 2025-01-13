# spec/swagger_helper.rb

Rswag::Api.configure do |config|
  config.swagger_root = Rails.root.to_s + '/swagger'

  config.swagger_docs = {
    'v1/swagger.yaml' => {
      swagger: '2.0',
      info: {
        title: 'TO-DO List API',
        version: 'v1'
      },
      paths: {},
      definitions: {}
    }
  }

  config.swagger_format = :yaml

  Swagger::Blocks.build_schema_json do
    definition :List do
      property :id, type: :integer
      property :title, type: :string
      property :priority, type: :string
      property :category, type: :string
      property :completed, type: :boolean
      property :created_at, type: :string, format: :date_time
      property :updated_at, type: :string, format: :date_time
    end
  end
  
end
