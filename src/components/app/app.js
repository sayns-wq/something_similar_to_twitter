import React, {Component} from 'react'
import AppHeader from '../app-header/app-header'
import SearchPanel from '../search-panel/search-panel'
import PostStatusFilter from '../post-status-filter/post-status-filter'
import PostList from '../post-list/post-list'
import PostAddForm from '../post-add-form/post-add-form'
import './app.css'
class App extends Component{
    constructor(props){
        super(props);
        this.state = {
             data : [
                {label: 'Going to relern react', important: true, like: false, id:1},
                {label: 'This is so good', important: false, like: false, id:2},
                {label: 'I need breack', important: false, like: false, id:3}
            ],
            term: '',
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        this.maxId = 4;
    }
    deleteItem(id){
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id)
           const before = data.slice(0, index);
           const after = data.slice(index+1);

           const newArray =[...before, ...after];
           
           return {
               data:newArray
           }
        })
    }
    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id:this.maxId++
        }
        this.setState(({data}) => {
            const newArray = [...data, newItem];
            return{
                data : newArray
            }
        })
    }

    onToggleImportant(id){
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id ===id);

            const old = data[index];
            const newItem ={...old, important: !old.important};
            const before = data.slice(0, index);
           const after = data.slice(index+1);

           const newArray =[...before, newItem, ...after];
           return{
            data : newArray
           }
        })

    }
    onToggleLiked(id){
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id ===id);

            const old = data[index];
            const newItem ={...old, like: !old.like};
            const before = data.slice(0, index);
           const after = data.slice(index+1);

           const newArray =[...before, newItem, ...after];
           return{
            data : newArray
        }
        })
    }

    searchPost(items, terms){
        if(terms.length === 0){
            return items
        }

        return items.filter((item) => {
            return item.label.indexOf(terms) > -1
        })
    }

    onUpdateSearch(term){
        this.setState({term})
    }

    filterPost(items, filter){
        if(filter === 'like'){
            return items.filter(item => item.like)
        }else{
            return items
        }
    }
    onFilterSelect(filter){
        this.setState({filter})
    }
    render() {

        const liked = this.state.data.filter(item => item.like).length;
        const allPosts = this.state.data.length;
        const visiblePosts = this.filterPost(this.searchPost(this.state.data, this.state.term), this.state.filter);
        return(
            <div className='app'>
                <AppHeader
                liked = {liked}
                allPosts = {allPosts}/>
                <div className = 'search-panel d-flex'>
                <SearchPanel
                onUpdateSearch ={this.onUpdateSearch}/>
                <PostStatusFilter filter = {this.state.filter}
                onFilterSelect = {this.onFilterSelect}/>
                </div>
                <PostList 
                posts = {visiblePosts}
                onDelete = {this.deleteItem}
                onToggleImportant = {this.onToggleImportant}
                onToggleLiked = {this.onToggleLiked}
                like = {this.state.data.like}
                important = {this.state.data.important}/>
                <PostAddForm
                onAdd = {this.addItem}/>
            </div>
            )
    }
     
}

export default App