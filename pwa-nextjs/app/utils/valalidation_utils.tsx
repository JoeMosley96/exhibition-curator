export default function validateCreateForm({title}:{title:string}) {
    let errors = {title:"", serverError:""};
    if (title.length===0) {
      errors.title = "Title is required.";
    } else if (title.length > 30) {
      errors.title = "Title must be 30 characters or less.";
    }
    return errors;
  }