## Local development

### Install and update

To develop locally ensure that all required packages are installed and up to date.
If bundler isn't installed, install with:  
```sudo gem install bundler```

Once installed, change to the root directory and run:  
```bundle update```

This will update the required packaged listed within the **GemFile** (think composer).  
Only github-pages is required but this in turn requires Jekyll plus additional libraries that GitHub uses.

### Running Jekyll commands

In order to run the site as GitHub would all Jekyll commands need to be run via `bundle`.  
E.g.
#### Build the project
```bundle exec jekyll build```

#### Start the server
```bundle exec jekyll serve --watch --baseurl ''```


## Categories
Categories are defined within the post Front Matter but any new categories will also need to be added to the data list within `_data/categories.json`. This ensures that the category filter appears on the homepage.

## Filters
The homepage layout and filtering is provided by the Isotope javascript library.

## Domain name
The domain name is configured via the CNAME file.
