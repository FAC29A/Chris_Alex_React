import React, { useEffect } from 'react';

interface DeleteItemProps {
  id: number; // Assuming id is a number
}

const DeleteItem: React.FC<DeleteItemProps> = ({ id }) => {
  useEffect(() => {
    const deleteItem = async () => {
      try {
        const response = await fetch(`/api/items/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete item');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    };

    deleteItem();
  }, [id]);

  return null; // Component doesn't render anything
};

export default DeleteItem;
