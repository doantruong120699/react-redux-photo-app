import Banner from 'components/Banner';
import PhotoForm from 'features/Photo/components/PhotoForm';
import { addPhoto, updatePhoto } from 'features/Photo/photoSlice';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { randomNumber } from 'utils/common';
import './styles.scss';

AddEditPage.propTypes = {};

function AddEditPage(props) {
    const dispatch = useDispatch();
    const history = useHistory()
    const { photoId } = useParams();
    const isAddMode = !photoId;
    const editedPhoto = useSelector(state => {
        const foundPhoto = state.photos.find(x => x.id === +photoId)
        return foundPhoto;
    });
    const initialValues = isAddMode
        ? {
            title: '',
            categoryId: null,
            photo: '',
        }
        : editedPhoto;

    const handleSubmit = (values) => {
        return new Promise(resolve => {
            setTimeout(() => {
                if (isAddMode) {
                    const newPhoto = {
                        ...values,
                        id: randomNumber(10000, 99999),
                    }
                    const action = addPhoto(values);
                    dispatch(action);
                }
                else {
                    const action = updatePhoto(values);
                    dispatch(action);
                }
                history.push('/photos')
                resolve(true);
            }, 200);
        });
    }
    return (
        <div className="photo-edit">
            <Banner title="Pick your amazing photo 😎" />

            <div className="photo-edit__form">
                <PhotoForm
                    isAddMode={isAddMode}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}

export default AddEditPage;