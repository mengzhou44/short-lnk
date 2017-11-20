import React from 'react';
import moment from 'moment';
import { Mateor } from 'meteor/meteor';
import Clipboard from 'clipboard';

export default class LinkListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);

    this.clipboard
      .on('success', () => {
        this.setState({
          copied: true
        });
        setTimeout(() => {
          this.setState({
            copied: false
          });
        }, 1000);
      })
      .on('error', () => {
        alert('Unable to copy. Please manually copy the link.');
      });
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }

  onToggleVisible() {
    Meteor.call(
      'links.setVisibility',
      this.props.link._id,
      !this.props.link.visible,
      (err, res) => {
        if (err) {
          this.setState({ error: err.reason });
        }
      }
    );
  }

  renderStats() {
    if (this.props.link.visitedCount === 0) {
      return <p> 0 visit </p>;
    }

    const visitsMessage = this.props.link.visitedCount > 1 ? 'visits' : 'visit';
    const visitedMessage = moment(this.props.link.lastVisitedAt).fromNow();

    return (
      <p>
        {this.props.link.visitedCount} {visitsMessage} ({visitedMessage}){' '}
      </p>
    );
  }

  render() {
    const shortUrl = Meteor.absoluteUrl(this.props.link._id);
    const copyButtonText = this.state.copied ? 'Copied' : 'Copy';
    return (
      <div style={{ marginBottom: 20 }}>
        <h3> {this.props.link.url} </h3>
        {this.renderStats()}
        <p>{shortUrl}</p>
        <a href={shortUrl} target="_blank" className="button button--pill button-link">
          Visit{' '}
        </a>
        <button className="button button--pill" ref="copy" data-clipboard-text={shortUrl}>
          {copyButtonText}
        </button>
        <button className="button button--pill" onClick={this.onToggleVisible.bind(this)}>
          {this.props.link.visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    );
  }
}
