// CRUD Operation
import axios from 'axios';
import React from 'react';

class PostApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      userId: '',
      title: '',
      body: '',
      id: '',
    };
  }

  // CREATE POST
  create_post = async () => {
    try {
      const { userId, title, body } = this.state;
      const { data: post } = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          userId,
          title,
          body,
        }
      );
      // console.log(post);
      const posts = [...this.state.posts];
      posts.push(post);
      this.setState({ posts, userId: '', title: '', body: '' });
      // console.log(data);
    } catch (err) {
      console.error('error in POST');
    }
  };

  // READ POST
  get_posts = async () => {
    try {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      this.setState({ posts: data });
      console.log(data);
    } catch (err) {
      console.error('error in READ');
    }
  };

  // UPDATE POST
  update_post = async () => {
    try {
      const { id, userId, title, body } = this.state;
      const { data: post } = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          userId,
          title,
          body,
        }
      );
      const posts = [...this.state.posts];
      const index = posts.findIndex((post) => post.id === id);
      posts[index] = post;
      this.setState({ posts });
      console.log(post);
    } catch (err) {
      console.error('error in UPDATE');
    }
  };

  // DELETE POST
  delete_post = async (post_id) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${post_id}`
      );
      let posts = [...this.state.posts];
      posts = posts.filter((post) => post.id !== post_id);
      this.setState({ posts });
      console.log(posts);
    } catch (err) {
      console.error('error in DELETE');
    }
  };

  componentDidMount() {
    this.get_posts();
  }

  handle_change = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handle_submit = (event) => {
    event.preventDefault();
    if (this.state.id) {
      this.update_post();
    } else this.create_post();
  };

  select_post_to_submit = (post) => {
    this.setState({ ...post });
    console.log(post);
  };

  render() {
    return (
      <>
        <p>Post App</p>
        <form onSubmit={this.handle_submit}>
          <div>
            <label>User ID : </label>
            <input
              type="text"
              name="userId"
              value={this.state.userId}
              onChange={this.handle_change}
            />
          </div>
          <br />
          <div>
            <label>Title : </label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handle_change}
            />
          </div>
          <br />
          <div>
            <label>Body : </label>
            <input
              type="text"
              name="body"
              value={this.state.body}
              onChange={this.handle_change}
            />
          </div>
          <br />
          <div>
            <button type="submit">Submit</button>
          </div>
          <br />
        </form>
        <table>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
          {this.state.posts.map((post) => {
            return (
              <tr>
                <td>{post.id}</td>
                <td>{post.userId}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                  <button onClick={() => this.delete_post(post.id)}>
                    Delete
                  </button>
                  <button onClick={() => this.select_post_to_submit(post)}>
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </>
    );
  }
}

export default PostApp;
