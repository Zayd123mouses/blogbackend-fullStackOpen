const blogsRouter = require('express').Router()
const Blog = require('../models/blog')



blogsRouter.get('/', async (request, response) => {
   const blogs = await Blog.find({})
   response.status(200).json(blogs)
      
  })



 blogsRouter.get('/:id', async (request, response)=>{
  const blog = await Blog.findById(request.params.id)
  if(blog){
    response.status(200).json(blog)
  }else{
    response.status(404).end()
  }

 }) 
  


  blogsRouter.post('/', async (request, response) => {
    const body =  request.body 
   if(!body.url && !body.title){
    return response.status(400).json({error:"Missing title and url"})
   }

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
      })
  
  
const savedBlog = await blog.save()
response.status(201).json(savedBlog)
  })


  blogsRouter.delete('/:id', async(request, response)=>{
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })


  blogsRouter.put('/:id', async(request, response)=>{
    const body = request.body
    const blog = await Blog.findById(request.params.id)
    if(!blog){
      return response.status(404).json({error: "Blog not found"})
    }

    const newBlog= {
      title: body.title || blog.title || '',
      author: blog.title,
      url: body.url || blog.url || '',
      likes: body.likes || blog.likes 
    }
    await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    response.status(200).json(newBlog)
  })
  

  module.exports = blogsRouter