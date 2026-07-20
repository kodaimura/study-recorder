import React, { ReactNode } from 'react';
import { Modal, Button } from 'react-bootstrap';

type Props = {
    show: boolean;
    title: string;
    children: ReactNode;
    onHide: () => void;
    onSave?: () => void;
    saveLabel?: string;
    saving?: boolean;
};

const AppModal: React.FC<Props> = ({
    show,
    title,
    children,
    onHide,
    onSave,
    saveLabel = '保存',
    saving = false,
}) => {
    return (
        <Modal show={show} onHide={onHide} centered className="app-modal">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide} disabled={saving}>
                    キャンセル
                </Button>
                {onSave && (
                    <Button variant="dark" onClick={onSave} disabled={saving}>
                        {saving ? '保存中...' : saveLabel}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export { AppModal };
