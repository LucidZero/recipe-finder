# Recipe Finder

Recipe Finder is a web application built with React that allows users to search for recipes based on included and excluded ingredients as well as maximum preparation time. It utilizes the Spoonacular API to fetch recipe data and provides a responsive user interface for a seamless browsing experience.

## Technologies Used

- React
- JavaScript
- HTML
- CSS
- Spoonacular API

## Getting Started

Follow the instructions below to set up and run the Recipe Finder application locally on your machine.

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your machine.

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/recipe-finder.git

2. Navigate to the project directory:

    Copy code
    cd recipe-finder

3. Install the dependencies:

    Copy code
    npm install
## Usage

1. Enter the ingredients to include and exclude:
   - Type the desired ingredient in the "Include Items" input field and press Enter or click outside the field to add it to the list of included items.
   - Similarly, type the undesired ingredient in the "Exclude Items" input field and press Enter or click outside the field to add it to the list of excluded items.
   - To remove an item, click the "x" button next to it in the corresponding tags section.

2. Set the maximum preparation time in minutes:
   - Enter the desired maximum preparation time in minutes in the "Maximum Preparation Time" input field.
   - Use the increment and decrement arrows provided to adjust the time value.

3. Click the "Submit" button to fetch recipes based on the entered criteria.

4. The recipes will be displayed below, showing the recipe image and title.

5. Adjust the screen width to observe the responsive behavior of the recipes and input fields. They will adjust their layout and size to accommodate different screen sizes while maintaining their aspect ratio.