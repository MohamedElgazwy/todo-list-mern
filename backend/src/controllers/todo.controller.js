import Todo from "../models/todo.model.js";


 export const createTodo = async (req, res) => {
  
  try{
    
    const { title} = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required!"});
    }
    
    const todo = await Todo.create({
      title,
      user: req.user._id,
    });

    res.status(201).json(todo);

  } catch(error){
    res.status(500).json({ message: error.message });
  }
 };

  export const updateTodo = async (req, res) => {
    try{
      const {id} = req.params;

      const todo = await Todo.findById(id);

      if(!todo){
        return res.status(404).json({ message: "Todo not found!" });
      }

      if (todo.user.toString() !== req.user._id.toString()){
        return res.status(403).json({ message: "You are not authorized to update this todo!" });
      }

      const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });

      res.status(200).json(updatedTodo);
    } catch(error){
      res.status(500).json({ message: error.message });
    }
  };
 
  export const getTodos = async (req, res) => {
    try{
const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(todos);
    } catch(error) {
      res.status(500).json({ message: error.message})
    }
    
  };

  export const deleteTodo = async (req, res) => {
    try{

      const { id } = req.params;
      const todo = await Todo.findById(id);

      if(!todo) {
        return res.status(404).json({ message: 'Todo not found'});
      }

      if(todo.user.toString() !== req.user._id.toString()){
        return res.status(401).json({ message: 'Not authorized'});
      }

      await Todo.findByIdAndDelete(id);

      res.status(200).json({ message: 'Todo deleted successfully'});

    } catch(errror){
      res.status(500).json({ message: error.message});
    }
  };