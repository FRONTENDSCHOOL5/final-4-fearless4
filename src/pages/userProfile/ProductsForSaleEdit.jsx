import React, { useEffect, useState } from 'react';
import { Backspace, NavbarWrap } from '../../components/navbar/navbar.style';
import { SaveButton } from '../../components/button/button.style';
import {
	BgBtnCover,
	BgBtnInputStyle,
	InputList,
	InputStyle,
	InputWrap,
	ProductContainer,
	Upload,
	UploadImage,
	UploadImageBtn,
} from '../product/product.style';
import { Incorrect, LabelStyle } from '../../components/form/form.style';
import UploadButton from '../../assets/image/profileImageUploadButton.png';
import { API_URL } from '../../api.js';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';

export default function ProductsForSaleEdit() {
	// 이미지 등록
	const [selectedImage, setSelectedImage] = useState('');
	// 상품명 입력
	const [productName, setProductName] = useState('');
	const [productNameError, setProductNameError] = useState('');
	// 가격 입력
	const [productPrice, setProductPrice] = useState('');
	// URL 입력
	const [salesLink, setSalesLink] = useState('');
	const [salesLinkError, setSalesLinkError] = useState('');

	// 전체 유효성 검사
	const [isFormValid, setIsFormValid] = useState(false);

	const location = useLocation();
	const navigate = useNavigate();
	const url = API_URL;
	const token = localStorage.getItem('token');
	const selectedProduct = location.state.selectedProduct;

	useEffect(() => {
		setSelectedImage(selectedProduct.itemImage);
		setProductPrice(
			selectedProduct.price.toLocaleString('ko-KR', {
				style: 'currency',
				currency: 'KRW',
			})
		);
		setProductName(selectedProduct.itemName);
		setSalesLink(selectedProduct.link);
	}, []);

	useEffect(() => {
		const isFormValid =
			selectedImage !== '' &&
			productNameError === '' &&
			productPrice !== '' &&
			salesLinkError === '';
		setIsFormValid(isFormValid);
	}, []);

	useEffect(() => {
		const isFormValid =
			selectedImage !== '' &&
			productNameError === '' &&
			productPrice !== '' &&
			salesLinkError === '';
		setIsFormValid(isFormValid);
	}, [selectedImage, productNameError, productPrice, salesLinkError]);

	async function handleImageInputChange(e) {
		const formData = new FormData();
		const imageFile = e.target.files[0];
		console.log(imageFile);
		formData.append('image', imageFile);
		try {
			const res = await axios({
				method: 'POST',
				url: 'https://api.mandarin.weniv.co.kr/image/uploadfile/',
				data: formData,
				headers: {
					'Content-type': 'multipart/form-data',
				},
			});
			const imageUrl = 'https://api.mandarin.weniv.co.kr/' + res.data.filename;
			setSelectedImage(imageUrl);
		} catch (error) {
			console.error(error);
		}
	}

	async function handleSaveButtonClick(e) {
		const productData = {
			product: {
				itemName: productName,
				price: parseInt(productPrice.replace(/[₩,]/g, '')),
				link: salesLink,
				itemImage: selectedImage,
			},
		};
		try {
			const res = await axios({
				method: 'PUT',
				url: `${url}/product/${selectedProduct.id}`,
				data: productData,
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json',
				},
			});
			console.log(res);
			navigate('/myProfile');
		} catch (error) {
			console.error(error.response);
		}
	}

	function handleProductNameChange(e) {
		const productNameValue = e.target.value;
		setProductName(productNameValue);

		if (productNameValue.length < 2 || productNameValue.length > 15) {
			setProductNameError('2 ~ 15자 사이로 입력해주세요.');
		} else {
			setProductNameError('');
		}
	}

	function handlePriceChange(e) {
		const productPriceValue = e.target.value;
		const numericPrice = parseInt(productPriceValue.replace(/[^0-9]+/g, ''));
		const convertedPrice = numericPrice.toLocaleString('ko-KR', {
			style: 'currency',
			currency: 'KRW',
		});

		if (isNaN(numericPrice)) {
			setProductPrice('');
		} else {
			setProductPrice(convertedPrice);
		}
	}

	function handleSalesLinkChange(e) {
		const salesLinkValue = e.target.value;
		setSalesLink(salesLinkValue);
		const urlPatterns =
			/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;

		if (!urlPatterns.test(salesLinkValue)) {
			setSalesLinkError('유효한 URL을 입력해주세요.');
		} else {
			setSalesLinkError('');
		}
	}
	return (
		<>
			<NavbarWrap
				spaceBetween
				onClick={() => {
					navigate(-1);
				}}
			>
				<Backspace />
				<SaveButton disabled={!isFormValid} onClick={handleSaveButtonClick}>
					저장
				</SaveButton>
			</NavbarWrap>

			<ProductContainer>
				<Upload>
					<UploadImageBtn src={UploadButton} alt='업로드버튼' />
					<LabelStyle htmlFor='bg-btn'>이미지 등록</LabelStyle>
					<BgBtnInputStyle
						id='bg-btn'
						type='file'
						onChange={handleImageInputChange}
					/>
					<BgBtnCover>
						{selectedImage ? (
							<UploadImage src={selectedImage} />
						) : (
							<Incorrect>이미지를 등록해주세요</Incorrect>
						)}
					</BgBtnCover>
				</Upload>
				<InputWrap>
					<InputList>
						<LabelStyle htmlFor='product-name'>상품명</LabelStyle>
						<InputStyle
							id='product-name'
							type='text'
							placeholder='2 ~ 15자 이내여야 합니다.'
							value={productName}
							onChange={handleProductNameChange}
						/>
						{productNameError && <Incorrect>{productNameError}</Incorrect>}
					</InputList>
					<InputList>
						<LabelStyle htmlFor='product-price'>가격</LabelStyle>
						<InputStyle
							id='product-price'
							type='text'
							value={productPrice}
							placeholder='숫자만 입력 가능합니다.'
							onChange={handlePriceChange}
						/>
					</InputList>
					<InputList>
						<LabelStyle htmlFor='sales-link'>판매 링크</LabelStyle>
						<InputStyle
							id='sales-link'
							type='url'
							placeholder='URL을 입력해 주세요.'
							value={salesLink}
							onChange={handleSalesLinkChange}
						/>
						{salesLinkError && <Incorrect>{salesLinkError}</Incorrect>}
					</InputList>
				</InputWrap>
			</ProductContainer>
		</>
	);
}