const socket = io();

// Products form
const formAddProduct = document.querySelector('#form-add-product');
const listProducts = document.querySelector('#list-products');
const nameInput = document.querySelector('#name-product');
const priceInput = document.querySelector('#price-product');
const imgInput = document.querySelector('#img-product');
const tableProducts = document.querySelector('#table-products');
const sectionProduct = document.querySelector('#section-products');
const noProducts = document.querySelector('#no-products');

formAddProduct.addEventListener('submit', e => {
	e.preventDefault();
	const product = {
		name: nameInput.value,
		price: priceInput.value,
		img: imgInput.value
	};
	socket.emit('product', product);
	e.target.reset();
});

const renderProducts = products => {
	if (products.length > 0) {
		noProducts.style.display = 'none';
		tableProducts.innerHTML = '';
		products.forEach(product => {
			tableProducts.innerHTML += `
		<tr class="text-center">
			<td class="align-middle">${product.name}</td>
			<td class="align-middle">${product.price}</td>
			<td class="align-middle">
				<img src="${product.img}" alt="${product.name}" width="100px">
			</td>
		</tr>`;
		});
	} else {
		noProducts.style.display = 'block';
	}
}

// Chat form
const chatForm = document.querySelector('#chat-form');
const userEmail = document.querySelector('#user-email');
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const age = document.querySelector("#age");
const alias = document.querySelector("#alias");
const chatMessage = document.querySelector('#chat-message');
const tableChat = document.querySelector('#table-chat');

chatForm.addEventListener('submit', e => {
	e.preventDefault();
	if (userEmail.value == '') return alert('Ingresa tu email');
	const mensajes = {
		email: userEmail.value,
		message: chatMessage.value,
		date: new Date().toLocaleString()
	}
	console.log(mensajes)
	socket.emit('message', mensajes);
	e.target.reset();
});

const renderChat = mensajes => {
	if (mensajes.length > 0) {
		tableChat.innerHTML = '';
		mensajes.forEach(mensaje => {
			tableChat.innerHTML += `
		<div>
			<b class="text-primary">${mensaje.email}</b>
			[<span style="color: brown;">${mensaje.date}</span>]
			: <i class="text-success">${mensaje.message}</i>
		</div > `;
		})
		chatMessage.focus();
	}
}

socket.on('products', products => {
	renderProducts(products);
});

socket.on('messages', mensajes => {
	renderChat(mensajes);
});